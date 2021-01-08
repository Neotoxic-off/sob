function colors(color)
{
    const data = {
        "reset"   : 0,
        "black"   : 30,
        "red"     : 31,
        "green"   : 32,
        "yellow"  : 33,
        "blue"    : 34,
        "magenta" : 35,
        "cyan"    : 36,
        "white"   : 37
    }

    return (`\x1b[${data[color]}m`)
}

module.exports = colors;