const chartContainer = document.querySelector('.chart');

const today = new Date();
const date = new Intl.DateTimeFormat(navigator.language, {
  weekday: 'long',
}).format(today);

async function fetchData() {
  const charFetch = await fetch('./data.json');

  const data = await charFetch.json();
  generateChart(data);
}

function generateChart(data) {
  const markup = data
    .map(function (data) {
      return `<div class="chart-block">
      <div class="amt-block">$${+data.amount}</div>
            <div class="day ${
              data.day === date.substr(0, 3).toLowerCase()
                ? 'today'
                : ''
            }" style="height:${data.amount * 3}px"></div>
            <span>${data.day}</span>
            </div>`;
    })
    .join('');
  chartContainer.insertAdjacentHTML('afterbegin', markup);
}

chartContainer.addEventListener('mouseover', amt);

chartContainer.addEventListener('mouseout', amt);

function amt(e) {
  const dayBlock = e.target;
  if (dayBlock.classList.contains('day')) {
    dayBlock
      .closest('.chart-block')
      .classList.toggle('active');
  }
}

fetchData();
