export interface IDatepickerOptions {
    autohide?: boolean
    beforeShowDay?: any
    beforeShowDecade?: any
    beforeShowMonth?: any
    beforeShowYear?: any
    calendarWeeks?: boolean
    clearBtn?: boolean
    dateDelimiter?: string
    datesDisabled?: any[]
    daysOfWeekDisabled?: any[]
    daysOfWeekHighlighted?: any[]
    disableTouchKeyboard?: boolean
    format?: string
    language?: string
    maxDate?: Date
    maxNumberOfDates?: number
    maxView?: number
    minDate?: Date
    nextArrow?: string
    orientation?: string
    pickLevel?: number
    prevArrow?: string
    showDaysOfWeek?: boolean
    showOnClick?: boolean
    showOnFocus?: boolean
    startView?: number
    title?: string
    todayBtn?: boolean
    todayBtnMode?: number
    todayHighlight?: boolean
    updateOnBlur?: boolean
    weekStart?: number
  }
  