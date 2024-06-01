<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Address;
use Geocoder\Query\GeocodeQuery;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Geocoder\Provider\Provider;
use Geocoder\Collection;
use Geocoder\Location;

class TavernPostProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $processor,
        private Provider $acmeGeocoder
    ){
    }
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if(!$data->getAddress()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $input = $data->getAddress();
        $text = $input->getStreet() . ', ' . $input->getCity() . ', ' . $input->getCountry();
        $collection = $this->acmeGeocoder->geocodeQuery(GeocodeQuery::create($text));
        if(!$collection->isEmpty()) {
            $location = $collection->first();
            $address = new Address($location->getCountry(), $location->getLocality(), $location->getStreetName() . ' ' . $location->getStreetNumber());
            $address->setLatitude($location->getCoordinates()->getLatitude());
            $address->setLongitude($location->getCoordinates()->getLongitude());
            $data->setAddress($address);
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}