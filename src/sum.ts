export const sum = (a:number | string, b: number | string): number => {

    if(typeof a === 'string' || typeof b === 'string') return parseInt(a.toString()) + parseInt(b.toString())

    return a + b

}