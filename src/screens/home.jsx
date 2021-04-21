import React, { useEffect, useState } from "react";
import CSVParser from "../utilities/csv-parser"
import ObjectZipper from "../utilities/object-zipper"
import ImageLoader from  "../utilities/image-loader"
import Flashcard from "../components/flashcard"
import Controls from "../components/controls"
import { numberOfFakeCards, cardOpacityOffset, maxDragDistance, dragThreshold, preloadImagesNumber} from "../utilities/constants"
import {DragDirectionContext} from "../contexts"


const dataEndpoint = "http://take-home-wildlife.s3-website-us-west-2.amazonaws.com/data.csv"

const imageLoader = new ImageLoader(preloadImagesNumber)

const onDrag=(e, dragDirectionX, touch, tictac, setDrag)=>{
    if (!tictac) return
    const centerX = dragDirectionX? window.innerWidth / 2 : window.innerHeight / 2;
    const diff = touch - centerX
    //TODO: remove "magic numbers"
    setDrag(Math.max(-dragThreshold, Math.min((diff/4), dragThreshold)))
}

const clearDrag=(drag, setDrag, putCardBack, postDrag, tictac, setTicTac, incorrect, setIncorrect, correct, setCorrect)=>{
    setDrag(0)
    if (Math.abs(drag) > maxDragDistance) {
        putCardBack()
        postDrag()
        setTicTac(!tictac)
        if (drag < 0) {
            setIncorrect(incorrect+1)
        } else if (drag > 0) {
            setCorrect(correct+1)
        }
    }
}
const Home = ()=>{
    const [wildlifeData, setWildlifeData] = useState([])
    const [isRotatedArr, setRotatedArray] = useState([])
    const [rotationDirectionArr, setRotationDirectionArr] = useState([])
    const [top, setTop] = useState(0)
    const [drag1, setDrag1] = useState(0)
    const [drag2, setDrag2] = useState(0)
    const [tictac, setTicTac] = useState(true)
    const [second, setSecond] = useState(1)
    const [dragDirectionX, setDragDirectionX] = useState(true) // True=X False=Y
    const [xOrY, setXOrY] = useState("X")
    const [topKeyFlipped, setTopKeyFlipped] = useState(false)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)

    const putCardBack = ()=>{
        setRotatedArray([...Array(12).keys()].map(()=>Math.floor(Math.random() * 10)))
        setRotationDirectionArr([...Array(12).keys()].map(()=>Math.floor(Math.random() * 10)))
    }

    useEffect(()=>{
        fetch(dataEndpoint).then(response=>response.text()).then((textResult)=>{
            const csvParser = new CSVParser()
            const dataLines = csvParser.parse(textResult)
            const objectZipper = new ObjectZipper()
            const data = objectZipper.zip(dataLines[0], dataLines.slice(1))
            console.log("Got Data ", data)
            setWildlifeData(data)
        })
        //TODO: remove magic numbers
        setRotatedArray([...Array(12).keys()].map(()=>Math.floor(Math.random() * 10)))
        setRotationDirectionArr([...Array(12).keys()].map(()=>Math.floor(Math.random() * 10)))

        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        if (windowWidth >= windowHeight) {
            setDragDirectionX(true)
            setXOrY("X")
        } else {
            setDragDirectionX(false)
            setXOrY("Y")
        }
    },[])

    useEffect(()=>{
        imageLoader.loadImages(top, wildlifeData)
    }, [top, wildlifeData])

    useEffect(()=>{
        if(correct+incorrect == wildlifeData.length) {
            console.log(correct+incorrect)
            setCorrect(0)
            setIncorrect(0)
        }
    }, [incorrect, correct])
    useEffect(()=>{
        window.addEventListener("orientationchange", function(event) {
            console.log("Orientation changed")
            console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
            const angle = event.target.screen.orientation.angle
            if (angle===90) {
                setDragDirectionX(true)
                setXOrY("X")
            } else {
                setDragDirectionX(false)
                setXOrY("Y")
            }
        });
        window.addEventListener("resize", function(event) {
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight
            if (windowWidth >= windowHeight) {
                setDragDirectionX(true)
                setXOrY("X")
            } else {
                setDragDirectionX(false)
                setXOrY("Y")
            }
        });
    },[])
    return (
        <DragDirectionContext.Provider value={{dragX: dragDirectionX}}>
            <div className="main-page">
                <div className="home-title absolute">
                    <span>Wildlife Flashcard</span>
                </div>
                <div className="instructions">
                    <span className="mx-2">[Controls:</span>
                    <span className="mx-2">Click/Swipe cards or use controls below]</span>
                </div>
                <div className="stack m-2 relative flex">
                    {
                        [...Array(numberOfFakeCards).keys()].map((_, k)=>{
                            let rotationStyle = `rotateZ(0deg)`
                            const isRotated = isRotatedArr[k]
                            const rotationDirection = rotationDirectionArr[k]
                            if (isRotated < 5) {
                                if(rotationDirection > 5) {
                                    rotationStyle = `rotateZ(-2deg)`
                                } else {
                                    rotationStyle = `rotateZ(2deg)`
                                }
                            }
                            const styles = { 
                                transform: `translateY(${-k*2}px) ${rotationStyle}` 
                            };
                            return <Flashcard card={null} styles={styles} classes={``} key={k} stacked={true}/>
                        })
                    }
                    <Flashcard styles={{
                        transform:`translate${xOrY}(${drag2}%) rotateZ(${15*((drag2)/100)}deg)`,
                        opacity: `${Math.max(cardOpacityOffset-Math.abs(drag2), 10)}%`
                    }}
                    onDrag={(e, touch)=>onDrag(e, dragDirectionX, touch, !tictac, setDrag2)}
                    clearDrag={(postDrag)=>{
                        clearDrag(drag2, setDrag2, putCardBack, postDrag, tictac, setTicTac, incorrect, setIncorrect, correct, setCorrect)
                        if(Math.abs(drag2)>maxDragDistance){
                            setSecond((top+1)%wildlifeData.length)
                        }
                    }}
                    card={wildlifeData[second]}
                    stacked = {tictac}
                    flipped = {topKeyFlipped}
                    setFlipped = {setTopKeyFlipped}
                    classes={`${Math.abs(drag2)<70 && "top-card"} ${Math.abs(drag2)>=70 && "bottom-card"} ${tictac && "absolute"} ${!tictac && "relative"}`}
                    />

                    <Flashcard styles={{
                            transform:`translate${xOrY}(${drag1}%) rotateZ(${15*((drag1)/100)}deg)`,
                            top:"0%",
                            opacity: `${Math.max(cardOpacityOffset-Math.abs(drag1), 10)}%`
                        }}
                    onDrag={(e, touch)=>onDrag(e, dragDirectionX, touch, tictac, setDrag1)}
                    clearDrag={(postDrag)=>{
                        clearDrag(drag1, setDrag1, putCardBack, postDrag, tictac, setTicTac, incorrect, setIncorrect, correct, setCorrect)
                        if(Math.abs(drag1)>maxDragDistance) {
                            setTop((second+1)%wildlifeData.length)
                        }
                    }}
                    card={wildlifeData[top]}
                    stacked = {!tictac}
                    flipped = {topKeyFlipped}
                    setFlipped = {setTopKeyFlipped}
                    classes={`${(Math.abs(drag1)<maxDragDistance && tictac) && "top-card"} ${Math.abs(drag1)>=maxDragDistance && "bottom-card"} ${!tictac && "absolute"} ${tictac && "relative"}`}
                    />
                </div>
                <Controls correct={correct} incorrect={incorrect} drag1={drag1} drag2={drag2} tictac={tictac} handleFlip={()=>setTopKeyFlipped(!topKeyFlipped)} 
                handleLeftDrag={()=>{
                    setTop((top+1)%wildlifeData.length)
                    setSecond((second+1)%wildlifeData.length)
                    setTopKeyFlipped(false)
                }} handleRightDrag={()=>{
                    setTop((top+1)%wildlifeData.length)
                    setSecond((second+1)%wildlifeData.length)
                    setTopKeyFlipped(false)
                }}/>
            </div>
        </DragDirectionContext.Provider>
    )
}

export default Home