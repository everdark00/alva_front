import React from "react"


function CategoryMenu({showCat, showAll}) {
    const buttons = [
        {
            name: "Пальто|куртки",
            cat: "jacket",
            key: "one"
        },
        {
            name: "Костюмы",
            cat: "costume",
            key: "two"
        },
        {
            name: "Свитера",
            cat: "pullover",
            key: "three"
        },
        {
            name: "Блейзеры",
            cat: "blazer",
            key: "four"
        },
        {
            name: "Рубашки",
            cat: "shirt",
            key: "five"
        },
        {
            name: "Джинсы",
            cat: "jeans",
            key: "six"
        },
        {
            name: "Брюки",
            cat: "trousers",
            key: "seven"
        },
        {
            name: "Шорты",
            cat: "shorts",
            key: "eigth"
        },
        {
            name: "Обувь",
            cat: "shoes",
            key: "nine"
        },
        {
            name: "Сумки|рюкзаки",
            cat: "bag",
            key: "ten"
        },
        {
            name: "Аксессуары",
            cat: "accessories",
            key: "eleven"
        }
    ]
    return (
        <div>
            <span className="cats">
            <div className="cat_header">КАТЕГОРИИ:</div>
            {buttons.map(elem => 
            <button onClick={()=>showCat(elem.cat)} className={"cat_button cat_pos_" + elem.key}>
                <span className="circle"></span>
                <span className="title">{elem.name}</span>
            </button>)}
            <button onClick={()=>showAll()} className="cat_button all_button_pos"> 
                <span className="all_title">ВСЯ ОДЕЖДА</span>
            </button>
        </span>
        </div>
    )
}

export default CategoryMenu;