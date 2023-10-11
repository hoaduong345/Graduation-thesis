import moment from 'moment';
export const numberFormat = (number: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)


export const currentDate = (date: Date) => {
    return moment(date).format('MMMM Do YYYY');
}

export const roundedNumber = (number: number) => Math.round(number);