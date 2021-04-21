class ImageLoader {
    constructor(noOfImages) {
        this.images = []
        this.noOfImages = noOfImages
    }
    preloadImages(urls, callback) {
        urls.forEach((url, k)=>{
            const image = new Image()
            image.src = url
            image.onload = callback
            this.images.push(image)
            if (this.images.length > this.noOfImages) {
                this.images.shift()
            }
        })
    }
    loadImages(top, data) {
        if (top % 5 == 0) {
            let nextFive = []
            for (let i = top+1; i < top + 6; i++) {
                let idx = i % data.length
                if (data.length > idx) {
                    nextFive.push(data[idx].image)
                }
            }
            this.preloadImages(nextFive, ()=>{console.log("Image loaded")})
        }
    }
}

export default ImageLoader