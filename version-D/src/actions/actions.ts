
export function setSelectedResource(resourceName: string, payload: {name: string, url: string} | undefined) {
    return {
        type: `SET_SELECTED_${resourceName.toUpperCase()}`,
        payload
    }
}

export function toggleResourceVisible(resourceName: string) {
    return {
        type: `TOGGLE_${resourceName.toUpperCase()}_VISIBLE`
    }
}