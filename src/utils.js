module.exports.isObjEmpty = (obj) => {
    return obj === undefined || (Object.keys(obj).length === 0 && obj.constructor === Object);
};