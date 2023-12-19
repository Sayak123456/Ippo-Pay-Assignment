import {useState} from 'react';
import Icon from 'react-icons-kit';
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import {arrows_exclamation} from 'react-icons-kit/linea/arrows_exclamation'
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check';
import axios from 'axios';

function App() {
  const [type, setType] = useState('password');

  const [isLower, setisLower]=useState(false);
  const [isUpper, setisUpper]=useState(false);
  const [isDigit, setIsDigit]=useState(false);
  const [isLength, setIsLength]=useState(false);
  const [isConsecutive, setIsConsecutive]=useState(false);
  const [distance, setDistance]=useState(6);
  const [input, setInput]=useState("");

  const handleChange=(value)=>{
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const length = /^(?=.{6,20}$)/;
    const threeConsecutive = /(.)\1\1/;

    setInput(value);

    if(lower.test(value)){
      setisLower(true);
    }
    else{
      setisLower(false);
    }
    if(upper.test(value)){
      setisUpper(true);
    }
    else{
      setisUpper(false);
    }
    if(number.test(value)){
      setIsDigit(true);
    }
    else{
      setIsDigit(false);
    }
    if(length.test(value)){
      setIsLength(true);
    }
    else{
      setIsLength(false);
    }
    if(threeConsecutive.test(value)){
      setIsConsecutive(false);
    }
    else{
      setIsConsecutive(true);
    }

    let result = 0;
    let lowerCase = 1;
    let upperCase = 1;
    let digit = 1;
    const characterList = value.split('');
    const passwordArray = new Array(value.length).fill(0);

    for (let i = 0; i < passwordArray.length;) {
        if (/[a-z]/.test(characterList[i])) {
            lowerCase = 0;
        }
        if (/[A-Z]/.test(characterList[i])) {
            upperCase = 0;
        }
        if (/\d/.test(characterList[i])) {
            digit = 0;
        }

        let j = i;

        while (i < characterList.length && characterList[i] === characterList[j]) {
            i++;
        }
        passwordArray[j] = i - j;
    }

    const totalMissingCharacter = lowerCase + upperCase + digit;

    if (passwordArray.length < 6) {
        result += totalMissingCharacter + Math.max(0, 6 - (passwordArray.length + totalMissingCharacter));
    } else {
        let extraCharacter = Math.max(passwordArray.length - 20, 0);
        let repeatingCharacter = 0;
        result += extraCharacter;

        for (let k = 1; k < 3; k++) {
            for (let i = 0; i < passwordArray.length && extraCharacter > 0; i++) {
                if (passwordArray[i] < 3 || passwordArray[i] % 3 !== (k - 1)) {
                    continue;
                }
                passwordArray[i] -= Math.min(extraCharacter, k);
                extraCharacter -= k;
            }
        }

        for (let i = 0; i < passwordArray.length; i++) {
            if (passwordArray[i] >= 3 && extraCharacter > 0) {
                const need = passwordArray[i] - 2;
                passwordArray[i] -= extraCharacter;
                extraCharacter -= need;
            }

            if (passwordArray[i] >= 3) {
                repeatingCharacter += Math.floor(passwordArray[i] / 3);
            }
        }

        result += Math.max(totalMissingCharacter, repeatingCharacter);
    }

    setDistance(result);
  }

  const handleSubmit = async (req, res) => {
    const passwordInfo = {
      text: input,
      isStrong: distance === 0 ? true : false,
      distanceFromStrong: distance
    }

    try{
      const response = await axios.post('http://localhost:5000/save', passwordInfo);
      console.log(response.data);
      window.location.reload(false);
    } catch (error) {
      console.error(error.response.data);
    }
  }  

  return (
    <div className="body">
      <div className="box">
        <h1 className="heading">Password Strength Checker</h1>
        <div className="input-with-icon-div form-control">
          <input className="custom-input" type={type} onChange={(e)=>handleChange(e.target.value)} placeholder='Enter a password'/>
          {type === "password" ? (
            <span className="icon-span" onClick={() => setType("text")}>
              <Icon icon={basic_eye_closed} size={18} />
            </span>
          ) : (
            <span className="icon-span" onClick={() => setType("password")}>
              <Icon icon={basic_eye} size={18} />
            </span>
          )}
        </div>

        <main className='tracker-box'>
          <div className={isLower?'validated':'not-validated'}>
            {isLower?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one lowercase letter
          </div>
          <div className={isUpper?'validated':'not-validated'}>
            {isUpper?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one uppercase letter
          </div>
          <div className={isDigit?'validated':'not-validated'}>
            {isDigit?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one number
          </div>
          <div className={isLength?'validated':'not-validated'}>
            {isLength?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            Length between 6 and 20 characters
          </div>
          <div className={isConsecutive?'validated':'not-validated'}>
            {isConsecutive?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            No 3 consecutive same characters
          </div>
          <div className={distance === 0 ?'validated':'not-validated'}>
            {distance === 0 ?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            {distance === 0 ? "All Set!😎" : `You are ${distance} steps away from a strong password`}
          </div>
        </main>
        {input.length > 0 && <button onClick={handleSubmit}>Save Password</button>}
      </div>
    </div>
  );
}

export default App;