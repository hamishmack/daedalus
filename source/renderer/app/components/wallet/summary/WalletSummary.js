// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Wallet from '../../../domains/Wallet';
import type { Currency } from '../../../types/currencyTypes';
import WalletSummaryHeader from './WalletSummaryHeader';
import WalletSummaryCurrency from './WalletSummaryCurrency';
import type { AssetToken } from '../../../api/assets/types';
import WalletSummaryNoTokens from './WalletSummaryNoTokens';
import WalletTokensList from '../tokens/WalletTokensList';

type Props = {
  wallet: Wallet,
  numberOfRecentTransactions: number,
  numberOfTransactions?: number,
  numberOfPendingTransactions: number,
  isLoadingTransactions: boolean,
  currentLocale: string,
  currencyIsFetchingRate: boolean,
  currencyIsActive: boolean,
  currencySelected: ?Currency,
  currencyRate: ?number,
  currencyLastFetched: ?Date,
  onCurrencySettingClick: Function,
  assets: Array<AssetToken>,
  onOpenAssetSend: Function,
  onCopyAssetParam: Function,
  onAssetSettings: Function,
  isLoadingAssets: boolean,
  assetSettingsDialogWasOpened: boolean,
  onExternalLinkClick: Function,
  onViewAllButtonClick: Function,
};

@observer
export default class WalletSummary extends Component<Props> {
  render() {
    const {
      wallet,
      numberOfPendingTransactions,
      numberOfRecentTransactions,
      numberOfTransactions,
      isLoadingTransactions,
      currentLocale,
      currencyIsActive,
      currencyIsFetchingRate,
      currencyLastFetched,
      currencyRate,
      currencySelected,
      onCurrencySettingClick,
      assets,
      onOpenAssetSend,
      onCopyAssetParam,
      onAssetSettings,
      assetSettingsDialogWasOpened,
      isLoadingAssets,
      onExternalLinkClick,
      onViewAllButtonClick,
    } = this.props;

    const { isRestoring } = wallet;
    const hasAssets = assets.length || isLoadingAssets;

    return (
      <>
        <WalletSummaryHeader
          wallet={wallet}
          numberOfRecentTransactions={numberOfRecentTransactions}
          numberOfTransactions={numberOfTransactions}
          numberOfPendingTransactions={numberOfPendingTransactions}
          isLoadingTransactions={isLoadingTransactions}
          currency={
            currencyIsActive && (
              <WalletSummaryCurrency
                wallet={wallet}
                currencyIsFetchingRate={currencyIsFetchingRate}
                currencyIsActive={currencyIsActive}
                currencySelected={currencySelected}
                currencyRate={currencyRate}
                currencyLastFetched={currencyLastFetched}
                onCurrencySettingClick={onCurrencySettingClick}
              />
            )
          }
        />
        {!isRestoring && (
          <>
            {hasAssets ? (
              <WalletTokensList
                wallet={wallet}
                assets={assets}
                onOpenAssetSend={onOpenAssetSend}
                isLoadingAssets={isLoadingAssets}
                onCopyAssetParam={onCopyAssetParam}
                onAssetSettings={onAssetSettings}
                assetSettingsDialogWasOpened={assetSettingsDialogWasOpened}
                currentLocale={currentLocale}
                title="Recently used tokens"
                onViewAllButtonClick={onViewAllButtonClick}
              />
            ) : (
              <WalletSummaryNoTokens
                numberOfAssets={assets.length}
                isLoadingAssets={isLoadingAssets}
                onExternalLinkClick={onExternalLinkClick}
              />
            )}
          </>
        )}
      </>
    );
  }
}
