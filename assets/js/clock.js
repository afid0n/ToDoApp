export function getClock() {
    const now = new Date();
    let hours = now.getHours();
    const timePeriod = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12 || 12; 
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const realTime = `${hours}:${minutes}:${seconds} ${timePeriod}`;
    document.getElementById('clock').textContent = realTime;
  }
  
 
  getClock();
  setInterval(getClock, 1000);
  