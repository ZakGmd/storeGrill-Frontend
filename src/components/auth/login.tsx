import { User, Building2, Upload, Mail, ShoppingCart, Check , Lock, Eye, EyeOff } from "lucide-react";
import { useState, type ChangeEvent} from "react";

interface FormData {
  email: string;
  password: string;
  role: 'supplier' | 'client' | '';
  profilePicture: File | null;
}

interface FormErrors {
  email?: string;
  password?: string;
  role?: string;
}

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Login(){
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: '',
    profilePicture: null
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  const steps: Step[] = [
    { number: 1, title: 'Account Details', icon: User },
    { number: 2, title: 'Choose Role', icon: Building2 },
    { number: 3, title: 'Profile Picture', icon: Upload }
  ];

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    if (!formData.role) {
      setErrors({ role: 'Please select a role' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = (): void => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | File | null): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleSubmit = (): void => {
    console.log('Registration completed:', formData);
    alert('Registration completed successfully!');
  };

  const renderStep1 = () => (
    <div className="flex flex-col w-full items-start gap-4">
                    <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex flex-col items-center text-center ">
                            <div className="text-[20px] font-semibold tracking-[-0.12px]">Create Your Account</div>
                            <p className="text-gray-600 text-[14px] tracking-[-0.13px]">Enter your email and password to get started</p>
                        </div>
                        <div className="flex flex-col w-full items-start ">
                            <div className={`${errors.email ? 'border-red-400/70 border' : ''} py-2 px-2 mb-2 relative overflow-hidden flex items-center gap-1 h-full w-full bg-gradient-to-r shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg`}>
                              <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg" 
                                color={formData.email.length > 0 ? "#fc7348" : "#1d1d1f66"} 
                                strokeWidth="1"
                                className="transition-all h-5 w-5 duration-300 "
                            >
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 4.25C2.48122 4.25 1.25 5.48122 1.25 7V17C1.25 18.5188 2.48122 19.75 4 19.75H20C21.5188 19.75 22.75 18.5188 22.75 17V7C22.75 5.48122 21.5188 4.25 20 4.25H4ZM7.4301 8.38558C7.09076 8.14804 6.62311 8.23057 6.38558 8.5699C6.14804 8.90924 6.23057 9.37689 6.5699 9.61442L11.5699 13.1144C11.8281 13.2952 12.1719 13.2952 12.4301 13.1144L17.4301 9.61442C17.7694 9.37689 17.852 8.90924 17.6144 8.5699C17.3769 8.23057 16.9092 8.14804 16.5699 8.38558L12 11.5845L7.4301 8.38558Z" fill={formData.email.length > 0 ? "#fc7348" : "#1d1d1f66"}></path>
                            </svg>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                                placeholder='Email' 
                                className='h-full z-10 text-[#1D1D1F] text-[14px] placeholder:text-[#1D1D1F]/40 placeholder:font-normal font-normal bg-transparent outline-none w-full' 
                            />
                        
                        </div>    
                            {errors.email && <p className="text-red-400 text-sm ">{errors.email}</p>}
                        </div>
                        <div className="flex flex-col w-full items-start ">
                            <div className={`${errors.password ? 'border-red-400/70 border' : ''} py-2 px-2 mb-2 relative overflow-hidden flex items-center gap-1 h-full w-full bg-gradient-to-r shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg`}>
                           <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={formData.password.length > 0 ? "#fc7348" : "#1d1d1f66"} 
                                className="w-5 h-5 transition-all duration-300"
                            >
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                            </svg>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                                placeholder='Password' 
                                className='h-full z-10 text-[#1D1D1F] text-[14px] placeholder:text-[#1D1D1F]/40 placeholder:font-normal font-normal bg-transparent outline-none w-full' 
                            />
                        
                        </div>    
                            {errors.password && <p className="text-red-400 text-sm ">{errors.password}</p>}
                        </div>
                        {currentStep < 3 ? (
                            <button
                            onClick={handleNext}
                            className="px-4 py-3 w-full bg-[#fc7348]/80 rounded-[8px] text-white text-center cursor-pointer hover:bg-[#fc7348]/90 duration-300 transition-all "
                            >
                            Continue
                            </button>
                        ) : (
                            <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                            Complete Registration
                            </button>
                        )}
                     </div>
                    <div className="flex items-center w-full gap-1">
                         <div className="w-full h-[2px] bg-[#F3F3F3] rounded-[8px] "></div>
                          <div className="text-[16px] leading-5  font-normal text-[#e6e6e6]  ">Or</div>
                          <div className="w-full h-[2px] bg-[#F3F3F3] rounded-[8px]"></div>
                    </div>
                    <div className="flex flex-col items-start w-full gap-2">
                        <div className="px-4 py-3 w-full bg-[#F3F3F3] flex gap-0.5 items-center justify-center rounded-[8px] text-[#1D1D1F] text-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5  transition-all duration-300 w-5 mr-1">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                         </svg>Continue with Google</div>
                         <div className="px-4 py-3 w-full bg-[#F3F3F3] flex gap-0.5 items-center justify-center rounded-[8px] text-[#1D1D1F] text-center"> 
                    <svg fill="#6c6fd5" className="h-5  transition-all duration-300 w-5 mr-1 rounded-[2px]" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="-143 145 512 512"  stroke="#6c6fd5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-143,145v512h512V145H-143z M169.5,357.6l-2.9,38.3h-39.3v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7 c8.7-11.5,20.6-19.3,41.1-19.3c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z"></path> </g></svg>Continue with Facebook</div>
                    </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 w-full">
      <div className="flex flex-col items-center text-center ">
        <div className="text-[20px] font-semibold tracking-[-0.12px]">Choose Your Role</div>
        <p className="text-gray-600 text-[14px] tracking-[-0.13px]">Select how you want to use our marketplace</p>
      </div>
      
      <div className="space-y-4 w-full">
        <div 
          onClick={() => handleInputChange('role', 'supplier' as const)}
          className={`p-6 border w-full  rounded-lg cursor-pointer transition-all ${
            formData.role === 'supplier' ? 'border-[#fc7348] bg-[#fc7348]/80 contrast-125' : 'border-gray-200 bg-[#FAFAFA]'
          }`}
        >
          <div className="flex w-full items-center space-x-4">
            <div className={`p-3 shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-full transition-all duration-200 ${
              formData.role === 'supplier' ? 'bg-white shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)] ' : 'bg-gray-100'
            }`}>
              <Building2 strokeWidth={2} className={`h-6 w-6 transition-all duration-200 ${
                formData.role === 'supplier' ? 'text-[#fc7348]' : 'text-[#1D1D1F]/60'
              }`} />
            </div>
            <div>
              <h3 className={`text-lg font-medium text-[#1D1D1F] transition-all duration-200 ${
                formData.role === 'supplier' ? 'text-white' : 'text-[#1D1D1F]/80'
              } `}>Supplier</h3>
              <p className={` tracking-[-0.12px] transition-all duration-200 ${
                formData.role === 'supplier' ? 'text-white' : 'text-[#1D1D1F]/60 '
              }`}>I want to sell products or services</p>
            </div>
          </div>
        </div>
        
        <div 
          onClick={() => handleInputChange('role', 'client' as const)}
          className={`p-6 border rounded-lg cursor-pointer transition-all duration-200 ${
            formData.role === 'client' ? 'border-[#fc7348] bg-[#fc7348]/80 contrast-125' : 'border-gray-200 bg-[#FAFAFA]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] ${
              formData.role === 'client' ? 'bg-white shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)] ' : 'bg-gray-100'
            }`}>
              <ShoppingCart className={`h-6 w-6 transition-all duration-200 ${
                formData.role === 'client' ? 'text-[#fc7348]' : 'text-[#1D1D1F]/60'
              }`} />
            </div>
            <div>
              <h3 className={`text-lg font-medium text-[#1D1D1F] transition-all duration-200 ${
                formData.role === 'client' ? 'text-white' : 'text-[#1D1D1F]/80'
              }`}>Client</h3>
              <p className={`tracking-[-0.12px] transition-all duration-200  ${
                formData.role === 'client' ? 'text-white' : 'text-[#1D1D1F]/60 '
              }`}>I want to buy products or services</p>
            </div>
          </div>
        </div>
      </div>
      
      {errors.role && <p className="text-red-500 text-sm mt-2 text-center">{errors.role}</p>}
       {currentStep < 3 ? (
        <div className="flex flex-col items-start gap-1">
          <button
            onClick={handleNext}
            className="px-4 py-3 w-full bg-[#fc7348]/80 rounded-[8px] text-white text-center cursor-pointer hover:bg-[#fc7348]/90 duration-300 transition-all "
            >
            Continue
          </button>
          <button
            onClick={handlePrevious}
            className="px-4 py-3 w-full  rounded-[8px] text-black text-center cursor-pointer hover:bg-gray-200/40 duration-300 transition-all "
            >
            Previous
          </button>   
        </div>
        
        ) : (
        <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
            Complete Registration
        </button>
        )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
        <div className="flex flex-col items-center text-center ">
            <div className="text-[20px] font-semibold tracking-[-0.12px]">Profile Picture</div>
            <p className="text-gray-600 text-[14px] tracking-[-0.13px]">Add a profile picture to personalize your account (optional)</p>
        </div>
   
      
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
          {formData.profilePicture ? (
            <img 
              src={URL.createObjectURL(formData.profilePicture)} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        <label className="cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="px-6 py-3 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg hover:border-orange-500 transition-colors flex items-center space-x-2">
            <Upload className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700">Choose Photo</span>
          </div>
        </label>
        
        {formData.profilePicture && (
          <p className="text-sm text-green-600 flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Photo uploaded successfully
          </p>
        )}
        <div className="text-center mt-4 flex flex-col w-full gap-2 ">
            <button
              onClick={handleSubmit}
            className="px-4 py-3 w-full bg-[#fc7348]/80 rounded-[8px] text-white text-center cursor-pointer hover:bg-[#fc7348]/90 duration-300 transition-all "
            >
              Complete Registration
            </button>
            <button
            onClick={handlePrevious}
            className="px-4 py-3 w-full  rounded-[8px] text-black text-center cursor-pointer hover:bg-gray-200/40 duration-300 transition-all "
            >
            Previous
          </button> 
           
        </div>
      </div>
    </div>
  );

    return(
        <>
         <div className={`  mx-auto items-center gap-5 pt-[100px]  h-screen flex flex-col`}>
            <div className="w-14 h-14 ">
                 <img src={"/logo.png"} height={40} width={40} alt={""} className="object-cover h-full w-full" />
            </div>
            <div className=" flex flex-col items-center w-full ">
                <div className="flex flex-col items-start gap-6  max-w-[420px]">
                 <div className="flex items-center w-full">
                    <div className={` ${currentStep === 1 ? 'bg-[#fc7348]/80 text-white' : 'bg-[#fc7348]/80 text-white'}  flex items-center transition-all duration-300 justify-center w-9 h-7 rounded-full  `}>1</div>
                    <div className={`w-[220px] h-[1.6px] ${currentStep === 1 ? 'from-[#fc7348]/80 to-gray-200 to-[70%]' : 'from-[#fc7348]/80 to-gray-200 from-[99%]'} transition-all duration-600 bg-gradient-to-r `}></div>
                    <div className={` ${currentStep === 2 ? 'bg-[#fc7348]/80 text-white' : currentStep === 3 ? 'bg-[#fc7348]/80 text-white' : 'bg-gray-200/50 text-[#1D1D1F]/30'} flex items-center transition-all duration-300 justify-center w-9 h-7 rounded-full  `}>2</div>
                    <div className={`w-[220px] h-[1.6px] ${
                      currentStep === 2
                        ? 'from-[#fc7348]/80 to-gray-200 to-[70%]'
                        : currentStep === 3
                        ? 'to-[#fc7348]/80 from-gray-100 to-[0%] '
                        : 'bg-gray-200/50'
                    } transition-all duration-200 bg-gradient-to-r`}></div>

                    <div className={` ${currentStep === 3 ? 'bg-[#fc7348]/80 text-white' : 'bg-gray-200/50 text-[#1D1D1F]/30'} flex items-center transition-all duration-300 justify-center w-9 h-7 rounded-full  `}>3</div>
                </div>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                </div>
               
            </div>
                

           
         </div>
        </>
    )
}