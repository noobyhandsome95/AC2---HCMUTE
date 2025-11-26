import { BoxInputBase } from "../components/sub/BoxInputBase";
import { ButtonBase } from "../components/sub/ButtonBase";
import type { User } from "../Types";

interface ProfileFormProps {
    user: User;
    formData: any;
    loading: boolean;
    message: { text: string; type: 'success' | 'error' } | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

export const ProfileForm = ({ user, formData, loading, message, onChange, onSave }: ProfileFormProps) => {
    return (
        <div className="relative min-h-screen h-auto w-full gradient-pattern">
            <div className="mx-auto top-0 translate-y-24 w-[90%] lg:w-[60%] bg-accent/10 border border-slate-400 rounded-lg">
                <div className="w-full py-2 md:py-12 flex flex-col md:flex-row">
                    
                    {/* Left Column */}
                    <div className="w-full md:w-1/3 mt-4 md:mt-12 px-2 flex flex-col items-center">
                        <img 
                            src={user.avatarURL || "logo.jpg"} 
                            alt="avatar" 
                            className="w-[160px] h-[160px] object-cover rounded-full border-2 border-slate-300" 
                        />
                        <h2 className="text-2xl text-center font-bold mt-4 text-white">{user.displayName}</h2>
                        <p className="text-md text-center text-gray-300">{user.email}</p>
                        <p className="text-md text-center text-slate-100 font-semibold mt-1">
                            {formData.country || "Viet Nam"}
                        </p>
                    </div>

                    <span className="hidden md:block w-[0.75px] h-auto bg-slate-400 mx-4"></span>

                    {/* Right Column */}
                    <div className="w-full md:w-2/3 px-6 md:px-12 flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold mt-4 text-white">Edit your profile</h2>
                        
                        {message && (
                            <div className={`p-2 rounded text-sm font-semibold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="w-full flex flex-row space-x-4">
                            <BoxInputBase 
                                type="text" name="firstName" nameHolder="First Name"
                                placeholder="First Name" width="w-1/2"
                                value={formData.firstName} onChange={onChange}
                            />
                            <BoxInputBase 
                                type="text" name="lastName" nameHolder="Last Name"
                                placeholder="Last Name" width="w-1/2"
                                value={formData.lastName} onChange={onChange}
                            />
                        </div>

                        <BoxInputBase 
                            type="email" name="email" nameHolder="Email"
                            placeholder={user.email} width="w-full"
                            disabled={true}
                        />

                        <BoxInputBase 
                            type="text" name="currentPosition" nameHolder="Current Position"
                            placeholder="Frontend Developer..." width="w-full"
                            value={formData.currentPosition} onChange={onChange}
                        />
                        <BoxInputBase 
                            type="text" name="education" nameHolder="Education"
                            placeholder="University Name..." width="w-full"
                            value={formData.education} onChange={onChange}
                        />

                        <div className="w-full flex flex-row space-x-4">
                            <BoxInputBase 
                                type="text" name="country" nameHolder="Country"
                                placeholder="Vietnam" width="w-1/2"
                                value={formData.country} onChange={onChange}
                            />
                            <BoxInputBase 
                                type="text" name="province" nameHolder="Province"
                                placeholder="Ho Chi Minh" width="w-1/2"
                                value={formData.province} onChange={onChange}
                            />
                        </div>

                        <div className="pt-4">
                            <ButtonBase
                                type="submit" 
                                onClick={onSave}
                                width="w-28"
                                name={loading ? "Saving..." : "Save"}
                                textColor="text-white"
                                bgColor="bg-secondary"
                                subClassName="hover:bg-accent/20"
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
