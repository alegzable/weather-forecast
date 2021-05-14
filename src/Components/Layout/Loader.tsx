import { PropsWithChildren } from "react";

type Props = { isLoading: boolean };

export const Loader: React.FC<PropsWithChildren<Props>> = ({ isLoading, children }) => {
	return isLoading ? <span>Loading...</span> : <div>{children}</div>;
};
