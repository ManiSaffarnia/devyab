module.exports = (data) => (
    data === undefined ||
    data === null ||
    (typeof data === 'object' && Object.keys(data).length === 0) ||
    (typeof data === 'string' && data.trim().length === 0)
)


//agar undifined bood
//agar null bood
//agar ye objecte khali bood => property nadasht
//agar ye string ba tool 0 bood
//dar natije isEmpty = true