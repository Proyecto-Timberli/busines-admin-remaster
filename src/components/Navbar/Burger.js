import './Burger.css'

export default function Burger({clicked}){
    return(
        <div className={!clicked?"hamburger ":"hamburger is-active"} id="hamburger-4">
            <span className="line bg-fuchsia-600 dark:bg-fuchsia-800"></span>
            <span className="line bg-fuchsia-600 dark:bg-fuchsia-800"></span>
            <span className="line bg-fuchsia-600 dark:bg-fuchsia-800"></span>
        </div>
    )
}

  
