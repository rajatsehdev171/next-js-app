export const getFormattedDate = (date:string)  => {
    let dateFormat = new Date(date);
    let year = dateFormat.getFullYear();
    let month = (1 + dateFormat.getMonth()).toString().padStart(2, '0');
    let day = dateFormat.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}