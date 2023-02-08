
const errorPage = (value:any) => {
    console.log(value);
    return <div>{value.errorCode} ERROR</div>
} ;

export default errorPage;