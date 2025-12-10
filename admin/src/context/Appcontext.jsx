import { createContext} from "react";


export const Appcontext = createContext()

const AppContextProvider = (props) => {

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        console.log(dob,'dob');
        console.log(today,'today');
        
        console.log('birthdate',birthDate);
        
        let age = today.getFullYear() - birthDate.getFullYear()
        // console.log(age,today,birthDate,dob)
        return age
    }

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const slotDateFormat = (slotDate) =>{
      const dateArray = slotDate.split("_")
      return dateArray[0]+" " +months[Number(dateArray[1])]+" " + dateArray[2]
    }

    const currency = "$"

    const value = {
        calculateAge,slotDateFormat,currency
    }
    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider