 export default function dateFormatted(start: any, end: any) {
    let options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const startDate = new Date(start);
  
    const startFormatted  = startDate.toLocaleString(undefined, options);
    if(!end)
      return startFormatted;
  
    const endDate = new Date(end);
  
    if(endDate.getFullYear() === startDate.getFullYear()) {
      options.year = undefined;
      if(endDate.getMonth() === startDate.getMonth()) {
        options.month = undefined;
        if(endDate.getDate() === startDate.getDate()) {
          options.day = undefined;
        }
      }
    }
  
    const endFormatted  = endDate.toLocaleString(undefined, options);
    return `${startFormatted} – ${endFormatted}`;
  }