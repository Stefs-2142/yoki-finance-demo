import type { ConfigCtrlState, ThemeCtrlState } from '@web3modal/core';
import type { EthereumClient } from '@web3modal/ethereum';
import React from 'react';
/**
 * Props
 */
export type Web3ModalProps = Omit<ConfigCtrlState, 'enableStandaloneMode' | 'standaloneChains' | 'walletConnectVersion'> & ThemeCtrlState & {
    ethereumClient?: EthereumClient;
};
/**
 * Component
 */
declare function CreateWeb3Modal({ ethereumClient, ...config }: Web3ModalProps): JSX.Element;
export declare const Web3Modal: React.MemoExoticComponent<typeof CreateWeb3Modal>;
export {};
