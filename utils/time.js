function getWeek() {
  let start = new Date(2019,1,25);
  let now = new Date();
  let week = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
  return week;
}
function getweekArray(){
  let start = new Date(2019,1,25);
  let list = [],day;
  let week = getWeek() - 1;
  let now  = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7 * week);
  for(let i = 0; i <= 4; i++){
    day = new Date(now.getTime() + 24*60*60*1000*i);
    list.push(day.getMonth()+1 + '.' + day.getDate() )
  }
  return list
}
module.exports = {
  getWeek:getWeek,
  getweekArray:getweekArray
}