import moment from 'moment';
export const numberFormat = (number: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)


export const currentDate = (date: string | Date) => {
    return moment(date).format('MMMM Do YYYY');
}

export const formatDate = (date: Date) => {
    return moment(date).format('DD/MM');
}

export const roundedNumber = (number: number) => Math.round(number);