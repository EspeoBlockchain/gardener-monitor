const convertUnixToDate = (unix: number): Date => new Date(unix * 1000);

export default convertUnixToDate;
