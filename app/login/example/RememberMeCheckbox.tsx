import { useState } from 'react';

interface RememberMeCheckboxProps {
  onRememberChange: (checked: boolean) => void;
}

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({ onRememberChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onRememberChange(newCheckedState);
  };

  return (
    <div className="flex justify-between">
      <label className=" ">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-gray-700">Remember Me</span>
        
      </label>      
            
            
        <span className="   underline underline-offset-4 text-slate-500 "> Forget password?</span>
    </div>
  );
};

export default RememberMeCheckbox;