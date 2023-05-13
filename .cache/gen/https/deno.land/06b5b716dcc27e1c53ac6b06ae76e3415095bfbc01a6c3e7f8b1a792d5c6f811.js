let byteToHex = [];
for(let k = 0; k < 100000; k++){
    byteToHex = [];
    for(let n = 0; n <= 0xff; ++n){
        const hexOctet = n.toString(16).padStart(2, "0");
        byteToHex.push(hexOctet);
    }
}
function serializeTuple(input) {
    const items = [];
    for (const [key, value] of Object.entries(input)){
        if (Array.isArray(value)) {
            throw new Error("Tuple value can't be an array");
        } else if (!!value && typeof value === "object") {
            items.push(`${key}: { ${serializeTuple(value)} }`);
        } else {
            items.push(`${key}: ${value}`);
        }
    }
    return items.join(", ");
}
export function ok(val) {
    return `(ok ${val})`;
}
export function err(val) {
    return `(err ${val})`;
}
export function some(val) {
    return `(some ${val})`;
}
export function none() {
    return `none`;
}
export function bool(val) {
    return `${val}`;
}
export function int(val) {
    return `${val}`;
}
export function uint(val) {
    return `u${val}`;
}
export function ascii(val) {
    return JSON.stringify(val);
}
export function utf8(val) {
    return `u${JSON.stringify(val)}`;
}
export function buff(val) {
    const buff = typeof val == "string" ? new TextEncoder().encode(val) : new Uint8Array(val);
    const hexOctets = new Array(buff.length);
    for(let i = 0; i < buff.length; ++i){
        hexOctets[i] = byteToHex[buff[i]];
    }
    return `0x${hexOctets.join("")}`;
}
export function list(val) {
    return `(list ${val.join(" ")})`;
}
export function principal(val) {
    return `'${val}`;
}
export function tuple(val) {
    return `{ ${serializeTuple(val)} }`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvY2xhcmluZXRAdjEuNS40L2NsYXJpdHlUeXBlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYnl0ZVRvSGV4OiBzdHJpbmdbXSA9IFtdO1xuZm9yIChsZXQgayA9IDA7IGsgPCAxMDAwMDA7IGsrKykge1xuICBieXRlVG9IZXggPSBbXTtcbiAgZm9yIChsZXQgbiA9IDA7IG4gPD0gMHhmZjsgKytuKSB7XG4gICAgY29uc3QgaGV4T2N0ZXQgPSBuLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgYnl0ZVRvSGV4LnB1c2goaGV4T2N0ZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVR1cGxlKGlucHV0OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICBjb25zdCBpdGVtczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbnB1dCkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlR1cGxlIHZhbHVlIGNhbid0IGJlIGFuIGFycmF5XCIpO1xuICAgIH0gZWxzZSBpZiAoISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGl0ZW1zLnB1c2goXG4gICAgICAgIGAke2tleX06IHsgJHtzZXJpYWxpemVUdXBsZSh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPil9IH1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtcy5wdXNoKGAke2tleX06ICR7dmFsdWV9YCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpdGVtcy5qb2luKFwiLCBcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvayh2YWw6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgKG9rICR7dmFsfSlgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyKHZhbDogc3RyaW5nKSB7XG4gIHJldHVybiBgKGVyciAke3ZhbH0pYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvbWUodmFsOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAoc29tZSAke3ZhbH0pYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vbmUoKSB7XG4gIHJldHVybiBgbm9uZWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib29sKHZhbDogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiBgJHt2YWx9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludCh2YWw6IG51bWJlciB8IGJpZ2ludCkge1xuICByZXR1cm4gYCR7dmFsfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50KHZhbDogbnVtYmVyIHwgYmlnaW50KSB7XG4gIHJldHVybiBgdSR7dmFsfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc2NpaSh2YWw6IHN0cmluZykge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV0ZjgodmFsOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGB1JHtKU09OLnN0cmluZ2lmeSh2YWwpfWA7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbiBVaW50OEFycmF5IGludG8gYSBDbGFyaXR5IGJ1ZmZlciB2YWx1ZVxuICogQGV4YW1wbGVcbiAqIHR5cGVzLmJ1ZmYoVWludDhBcnJheS5mcm9tKFs5OCwgMTE2LCA5OV0pXG4gKiAvLyByZXR1cm5zIFwiMHg2Mjc0NjNcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVmZih2YWw6IFVpbnQ4QXJyYXkpOiBzdHJpbmc7XG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gVWludDhBcnJheSBpbnRvIGEgQ2xhcml0eSBidWZmZXIgdmFsdWVcbiAqIEBkZXByZWNhdGVkIGB2YWxgIHNob3VsZCBiZSBhIGBVaW50OEFycmF5YFxuICogQGV4YW1wbGVcbiAqIHR5cGVzLmJ1ZmYoVWludDhBcnJheS5mcm9tKFs5OCwgMTE2LCA5OV0pXG4gKiAvLyByZXR1cm5zIFwiMHg2Mjc0NjNcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVmZih2YWw6IEFycmF5QnVmZmVyKTogc3RyaW5nO1xuLyoqXG4gKiBUcmFuc2Zvcm1zIGFuIFVpbnQ4QXJyYXkgaW50byBhIENsYXJpdHkgYnVmZmVyIHZhbHVlXG4gKiBAZXhhbXBsZVxuICogdHlwZXMuYnVmZihVaW50OEFycmF5LmZyb20oWzk4LCAxMTYsIDk5XSlcbiAqIC8vIHJldHVybnMgXCIweDYyNzQ2M1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmKHZhbDogc3RyaW5nKTogc3RyaW5nO1xuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmYodmFsOiBBcnJheUJ1ZmZlciB8IHN0cmluZykge1xuICBjb25zdCBidWZmID1cbiAgICB0eXBlb2YgdmFsID09IFwic3RyaW5nXCJcbiAgICAgID8gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHZhbClcbiAgICAgIDogbmV3IFVpbnQ4QXJyYXkodmFsKTtcblxuICBjb25zdCBoZXhPY3RldHMgPSBuZXcgQXJyYXkoYnVmZi5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmYubGVuZ3RoOyArK2kpIHtcbiAgICBoZXhPY3RldHNbaV0gPSBieXRlVG9IZXhbYnVmZltpXV07XG4gIH1cbiAgcmV0dXJuIGAweCR7aGV4T2N0ZXRzLmpvaW4oXCJcIil9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3QodmFsOiBBcnJheTx1bmtub3duPikge1xuICByZXR1cm4gYChsaXN0ICR7dmFsLmpvaW4oXCIgXCIpfSlgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsKHZhbDogc3RyaW5nKSB7XG4gIHJldHVybiBgJyR7dmFsfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0dXBsZSh2YWw6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBgeyAke3NlcmlhbGl6ZVR1cGxlKHZhbCl9IH1gO1xufVxuIl0s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