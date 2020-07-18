const lodash = require("lodash")

export const STATS_MAP = {
    INT: "intelligence",
    PER: "perception",
    STR: "strength",
    STA: "stamina",
    CHA: "charisma",
    COM: "communication",
    DEX: "dexterity",
    SPD: "speed"

}

export function modCharacteristic(player, path, value) {
    const copy = lodash.cloneDeep(player)
    lodash.set(copy, path, lodash.get(copy, path, 0) + value)
    return copy
}

export function setCharacteristic(player, path, value) {
    const copy = lodash.cloneDeep(player)
    lodash.set(copy, path, value)
    return copy
}

export function getCharacteristic(player, path) {
    return lodash.get(player, path, 0)
}


export function getCharacteristicPath(props) {

    if(props.stat)
        return STATS_MAP[props.stat.toUpperCase()]

    if(props.skill)
        return "skills."+props.skill.toLowerCase()

    if(props.relationship)
        return "relationships."+props.relationship.toLowerCase()

    return ""
}

export function getCharacteristicHuman(props) {

    if(props.stat)
        return lodash.upperFirst(STATS_MAP[props.stat.toUpperCase()])

    if(props.skill)
        return lodash.upperFirst(props.skill.toLowerCase() )+ " Skill"

    if(props.relationship)
        return "Relationship with " + lodash.upperFirst(props.relationship.toLowerCase() )

    console.log("WARNING: Unable to construct human characteristic name from props ", props)
}