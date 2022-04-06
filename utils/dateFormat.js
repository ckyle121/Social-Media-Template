const date = require('date-and-time');

const dateFormat = now => {
    return date.format(now, 'hh:mm A MM/DD/YYYY')
}

module.exports = dateFormat;