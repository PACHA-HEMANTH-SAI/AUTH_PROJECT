import { Check, X } from "lucide-react";
const PasswordCriteria = ({ password }) => {
	let hasUppercase = false;
	let hasLowercase = false;
	let hasNumber = false;
	let hasSpecial = false;

	[...password].forEach((char) => {
		const code = char.charCodeAt();

		if (code >= 65 && code <= 90) {
			hasUppercase = true;
		} else if (code >= 97 && code <= 122) {
			hasLowercase = true;
		} else if (code >= 48 && code <= 57) {
			hasNumber = true;
		} else {
			hasSpecial = true;
		}
	});

	const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: hasUppercase },
		{ label: "Contains lowercase letter", met: hasLowercase },
		{ label: "Contains a number", met: hasNumber },
		{ label: "Contains special character", met: hasSpecial },
	];

	return (
		<div className="mt-2 space-y-1">
			{criteria.map((item) => (
				<div key={item.label} className="flex items-center text-xs">
					{item.met ? (
						<Check className="size-4 mr-2 text-green-500" />
					) : (
						<X className="size-4 mr-2 text-gray-500" />
					)}

					<span className={item.met ? "text-green-500" : "text-gray-400"}>
						{item.label}
					</span>
				</div>
			))}
		</div>
	);
};

const PasswordStrengthMetric = ({password}) => {
    let hasUppercase = false;
	let hasLowercase = false;
	let hasNumber = false;
	let hasSpecial = false;
    let hasMinLength = (password.length >= 6);

	[...password].forEach((char) => {
		const code = char.charCodeAt();

		if (code >= 65 && code <= 90) {
			hasUppercase = true;
		} else if (code >= 97 && code <= 122) {
			hasLowercase = true;
		} else if (code >= 48 && code <= 57) {
			hasNumber = true;
		} else {
			hasSpecial = true;
		}
	});

    const getStrength = (pass) => {
		let strength = 0;
		if (hasMinLength) strength++;
		if (hasLowercase && hasUppercase) strength++;
		if (hasSpecial) strength++;
		if (hasNumber) strength++;
		return strength;
	};
	const strength = getStrength(password);

	const getColor = (strength) => {
		if (strength === 0) return "bg-red-500";
		if (strength === 1) return "bg-red-400";
		if (strength === 2) return "bg-yellow-500";
		if (strength === 3) return "bg-yellow-400";
		return "bg-green-500";
	};

	const getStrengthText = (strength) => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

    return (
		<div className='mt-2'>
			<div className='flex justify-between items-center mb-1'>
				<span className='text-xs text-gray-400'>Password strength</span>
				<span className='text-xs text-gray-400'>{getStrengthText(strength)}</span>
			</div>

			<div className='flex space-x-1'>
				{[1, 2, 3, 4].map((bar) => (
					<div
						key={bar}
						className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                        ${(bar <= strength) ? getColor(strength) : "bg-gray-600"}
                        `}
					/>
				))}
			</div>
			<PasswordCriteria password={password} />
		</div>
	);
}
export default PasswordStrengthMetric;