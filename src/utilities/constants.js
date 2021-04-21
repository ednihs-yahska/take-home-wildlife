//Preload images config
export const preloadImagesNumber = 5 //images

export const maxDragDistance = 70 //%

export const dragThreshold = 90 //%

export const cardOpacityOffset = 120 //%

export const touchTimeThreshold = 150 //ms

export const numberOfFakeCards = 12 //cards

export const infoFontSizeMap = [...Array(30).keys()].map(v=>{
    if (v<=24) return "2rem"
    if (v<=30) return "1rem"
    return "0.8rem"
})


//For future implementations
export const colors = {
    "FFD166": {"default":"FFD166", "Protanopia": "EBEA7F"},
    "4D243D": {"default":"4D243D", "Protanopia": "3B3A36"},
}