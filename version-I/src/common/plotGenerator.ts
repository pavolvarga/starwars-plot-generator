
export type Plot = {
    title: string,
    description: string
};

function generatePlot01(person: string, planet: string): Plot {
    return {
        title: 'Hero on the rescue mission again',
        description: `
            Our hero ${person} does not have a minute of a rest.
            One would think, that after saving the galaxy second time a moment of rest will be available, but no such luck.
            After spending just one night on a planet ${planet}, considered by many to be an embodiment of a paradise,
            our hero has realized that not everything is all right.
            Against own will, our hero is dragend into a rescue mission of an unique organism, which is on the brink of destruction.
            Its destruction could start a chain reaction with unimaginable consequences.
        `
    };
}

function generatePlot02(person: string, planet: string, starship: string): Plot {
    return {
        title: 'Hero has crashed on a remote planet',
        description: `
        Just a moment of an inattention and ${person} has become strangled on a remote planet, where danger lurks at every step.
        What happened to ${person}, to be strangled on such remote and desolate planet as ${planet} ?
        Just a brief moment of sleep in a cockpit of beloved ${starship} and micro meteorite swarm and you got a crash landing
        on a remote planet.
        Will ${person} be able to repair damaged ${starship} in time, or food and water will run out ?
        `
    };
}

function generatePlot03(person: string, planet: string, vehicle: string): Plot {
    return {
        title: 'Hero is in trouble again',
        description: `
        It is happening yet again.
        ${person} has to stop catastrophe before it destroys life on entire planet ${planet}.
        But before ${person} can even try to prevent it, a ${vehicle} must be repaired in order to get there in time.
        `
    };
}

function generatePlot04(person: string, planet: string, species: string): Plot {
    return {
        title: 'Hero and new terrible danger',
        description: `
        Is it a danger or a blessing ?
        Governor of a remote planet ${planet} has asked ${person} for a help.
        Suddenly an exploratory ship has crashed on his remote and forgotten planet.
        However before it has crashed, it managed to send a location signal into deep space.
        Preliminary analysis shows that it might be a ship belonging to the mysterious ${species}.
        No one has seen them or heard about them for two thousand years. Then why now, and why here ?
        `
    };
}

function generatePlot05(person: string, planet: string, starship: string, vehicle: string): Plot {
    return {
        title: 'Death comes from above',
        description: `
        A terrifying starship ${starship} is approaching a remote planet ${planet}.
        Help is on its way. But squadron of fast cruisers got badly damaged in a sudden ion storm and precious time
        has been lost on repairs. They will not make it on time.
        Just one man can prevent ${planet} from its total destruction.
        As a small boy he got lost in ruins of an old base of long gone civilization.
        He has never said a word about what he saw inside, or how he managed to get out, when so many has entered the base only
        to be never seen again. Since then, the boy has grown up and now lives alone in a remote place
        without any contact with outside world.
        Time is running out, and only ${person} on a beloved ${vehicle} can find him on time to unlock the mysterious base
        and prevent the total destruction of ${planet}.
        `
    };
}

function generatePlot06(person: string, planet: string, starship: string, species: string): Plot {
    return {
        title: 'Hero and a terrible discovery',
        description: `
        Can it be really true ?
        Just barely detectable distress signal got pick up by a single ship ${starship}.
        Is it even possible that among so many ships on an orbit of ${planet}, only ${starship} was able to detect it.
        Is it really true, or it is a very ingenious trap ?
        Be it as it may, ${person} can not let this opportunity to slip away.
        A chance however remote of discovering a ship belonging to long lost ${species} will not present again.
        So ${person} is on its way to new adventure.
        `
    };
}

function generatePlot07(person: string, planet: string, vehicle: string, species: string): Plot {
    return {
        title: 'New threat rises',
        description: `
        How much can happen if your ${vehicle} breaks down ?
        ${person} is about to find out.
        It was supposed to be a routine journey between two remote cities on a mining planet ${planet}.
        Fast sand storms has always hit convoys.
        In past two years ${person} and ${vehicle} got hit by dozens of them and lived another day.
        This one was however somehow different and ${vehicle} broke down.
        What is worse the radio broke down as well.
        So no way how to send a distress signal.
        And another sand storm is approaching, from the looks of it, its bigger than the previous one.
        So ${person} has no choice, but to explore ruins of a city nearby.
        It is said it was build by a long gone ${species} thousands of years before the first galactic war.
        It is also said, that no one who has gone to explore it, has return to tell its secrets.
        With sand storm approaching and no way how to send a distress signal, there is only one option left for ${person}.
        `
    };
}

function generatePlot08(person: string, planet: string, starship: string, vehicle: string, species: string): Plot {
    return {
        title: 'Enemy has return',
        description: `
        It was a terrible war.
        Ten years has passed and ${person} got finally used to a peaceful life, well sort of peaceful life, on a planet ${planet}.
        It will be three years, since ${person} has taken the job of escorting convoys.
        It is an ok job. Most of the time it is enough if yours ${vehicle} looks terrifying and all wanna be robbers will think twice,
        if they want to try their luck. And those who don't ? Well they are those who are not part of the future.
        The nightmares are almost gone, well most of nights. It is hard to believe that some nights pass without a nightmare
        about destruction of a ${starship} by the dreadful ${species}. It was supposed to be the best ship in the fleet.
        One mistake and it took less than hour for ${species} to break through its defenses and board it. A terrible close
        quarters battle took another two hours before the self destruction counting started.
        In the end only five rescue pods got away from the blast radius.
        It really has passed ten years, then why now a message came from long death former commanding officer ?
        `
    };
}

function highlight(value: string | undefined): string | undefined {
    return value ? `<span style="color: red">${value}</span>` : value;
}

/**
 * Dummy star wars plot generator.
 * Depending on used inputs (resources from the star wars universe), it will
 * generate hardcoded plot with substituted plots.
 * @returns {{description: string, title: string}}
 */
function generatePlot(person: string, planet: string, starship?: string, vehicle?: string, species?: string): Plot {

    const
        highlightedPerson = (highlight(person) as string),
        highlightedPlanet = (highlight(planet) as string),
        highlightedStarship = highlight(starship),
        highlightedVehicle = highlight(vehicle),
        highlightedSpecies = highlight(species);

    return generate(highlightedPerson, highlightedPlanet, highlightedStarship, highlightedVehicle, highlightedSpecies);
}

function generate(person: string, planet: string, starship?: string, vehicle?: string, species?: string): Plot {

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
        return generatePlot06(person, planet, starship, species);
    }
    else if(!starship && vehicle && species) {
        return generatePlot07(person, planet, vehicle, species);
    }
    else {
        return generatePlot08(person, planet, (starship as string), (vehicle as string), (species as string));
    }
}

export { generatePlot };
