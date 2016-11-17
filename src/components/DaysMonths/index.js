import React, { PropTypes } from 'react'
import './index.scss'

const DaysMonths = ({date, activeDays}) => {
  let actualDate = new Date(date.getTime())
  actualDate.setDate(1)

  let actualMonth = actualDate.getMonth()
  let calendar = []

  let firstDayOfMonth = (actualDate.getDay() === 0) ? 7 : actualDate.getDay()

  for (let i = 1; i < firstDayOfMonth; i++) {
    calendar.push({'dayClass': 'no-day', 'number': null})
  }
  
  while (actualDate.getMonth() === actualMonth) {
    let dayClass = 'day'
    let classes = '';
    if (actualDate.getDay() === 1) {
      dayClass += ' clear'
    }
    if (actualDate.getDate() in activeDays) {
      dayClass += ' active'
      classes = activeDays[actualDate.getDate()].join('<br />')
    }
    calendar.push({'dayClass': dayClass, 'number': actualDate.getDate(), classes})
    actualDate.setDate(actualDate.getDate() + 1)
  }

  if (actualDate.getDay() === 0) {
    for (let i = 7, j = calendar.length % 7; i > j; i--) {
      calendar.push({'dayClass': 'no-day', 'number': null})
    }
  }
  return (
    <div className='dayContainer'>
      {calendar.map((day, index) => {
        return day.number !== null
          ? <div key={index} data-tip={day.classes} data-multiline={true} className={day.dayClass}>{day.number}</div>
          : <div key={index} className={day.dayClass}></div>
      })}
    </div>
  )
}
DaysMonths.propTypes = {
  date: PropTypes.object.isRequired
}

export default DaysMonths
