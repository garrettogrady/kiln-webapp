interface LabelProps {
    title: string;
    amount: string;
}

const Label: React.FC<LabelProps> = ({ title, amount }) => {
    return (
        <div className="flex justify-between items-center w-full px-4 pt-2 pb-2">
            <h3 className="text-sm font-semibold text-black dark:text-white">{title}</h3>
            <p className="text-sm font-semibold text-black dark:text-white">{amount}</p>
        </div>
    );
};

export default Label;
