import React from "react";
import { PropsWithChildren } from "react";
import Spinner from "./Spinner";

type Props = { isLoading: boolean };

export const Loader: React.FC<PropsWithChildren<Props>> = ({ isLoading, children }) => {
	return isLoading ? <Spinner /> : <>{children}</>;
};
