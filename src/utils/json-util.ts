

// export function flatten(object, prefix = '')  {
//     return Object.keys(object).reduce((carry, key) => {
//         const pre = prefix ? prefix + `[${key}]` : '';

//         if (Array.isArray(object[key])) {
//             carry = object[key].reduce((array, value, index) => {
//                 array[(pre || key) + `[${index}]`] = value;
//                 return array;
//             }, carry);
//         } else if (object[key] && typeof object[key] === 'object') {
//             Object.assign(carry, this.flatten(object[key], pre || key));
//         } else {
//             carry[pre || key] = object[key];
//         }

//         return carry;
//     }, {});
// };
