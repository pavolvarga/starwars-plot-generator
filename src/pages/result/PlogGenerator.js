
function generatePlot01(person, planet) {
    return {
        title: 'Hero on the rescue mission again',
        description: '01'
    };
}

function generatePlot02(person, planet, starship) {
    return {
        title: 'Hero has crashed on a remote planet',
        description: '02'
    };
}

function generatePlot03(person, planet, vehicle) {
    return {
        title: 'Hero is in trouble again',
        description: '03'
    };
}

function generatePlot04(person, planet, species) {
    return {
        title: 'Hero and new terrible danger',
        description: '04'
    };
}

function generatePlot05(person, planet, sharship, vehicle) {
    return {
        title: 'Hero in a race against time',
        description: '05'
    };
}

function generatePlot06(person, planet, starship, species) {
    return {
        title: 'Hero and a terrible discovery',
        description: '06'
    };
}

function generatePlot07(person, planet, vehicle, species) {
    return {
        title: 'New threat rises',
        description: '07'
    };
}

function generatePlot08(person, planet, starship, vehicle, species) {
    return {
        title: 'Enemy has return',
        description: '08'
    };
}

/**
 * Dummy star wars plot generator.
 * Depending on used inputs (resources from the star wars universe), it will
 * generate hardcoded plot with substituted plots.
 * @returns {{description: string, title: string}}
 */
function generatePlot({person, planet, starship, vehicle, species}) {

    if (!starship && !vehicle && !species) {
        return generatePlot01(person, planet);
    }
    else if (starship && !vehicle && !species) {
        return generatePlot02(person, planet, starship);
    }
    else if (!starship && vehicle && !species) {
        return generatePlot03(person, planet, vehicle);
    }
    else if (!starship && !vehicle && species) {
        return generatePlot04(person, planet, species);
    }
    else if(starship && vehicle && !species) {
        return generatePlot05(person, planet, starship, vehicle);
    }
    else if(starship && !vehicle && species) {
        return generatePlot06(person, planet, starship, vehicle);
    }
    else if(!starship && vehicle && species) {
        return generatePlot07(person, planet, vehicle, species);
    }
    else {
        return generatePlot08(person, planet, starship, vehicle, species);
    }

}

export { generatePlot }
