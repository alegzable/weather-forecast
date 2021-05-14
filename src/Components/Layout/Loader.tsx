import React from "react";
import { PropsWithChildren } from "react";
import Spinner from "./Spinner";

type LoaderProps = { isLoading: boolean };

export const Loader: React.FC<PropsWithChildren<LoaderProps>> = ({ isLoading, children }) => {
	return isLoading ? <Spinner /> : <>{children}</>;
};
