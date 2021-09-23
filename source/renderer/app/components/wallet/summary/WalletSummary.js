// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import Wallet from '../../../domains/Wallet';
import type { Currency } from '../../../types/currencyTypes';
import WalletSummaryHeader from './WalletSummaryHeader';
import WalletSummaryCurrency from './WalletSummaryCurrency';
import type { AssetToken } from '../../../api/assets/types';
import WalletSummaryNoTokens from './WalletSummaryNoTokens';
import WalletTokensList from '../tokens/WalletTokensList';
import { MAX_TOKENS_ON_SUMMARY_PAGE } from '../../../config/numbersConfig';

const messages = defineMessages({
  tokensListTitle: {
    id: 'wallet.summary.tokensList.title',
    defaultMessage: '!!!Recently used tokens',
    description: 'Send button on Wallet summary assets page',
  },
});

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
  onToggleFavorite: Function,
  tokenFavorites: Object,
};

@observer
export default class WalletSummary extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

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
      onToggleFavorite,
      tokenFavorites,
    } = this.props;
    const { intl } = this.context;

    const { isRestoring } = wallet;
    const hasAssets = (!!assets && assets.length) || isLoadingAssets;

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
                assets={assets.slice(0, MAX_TOKENS_ON_SUMMARY_PAGE)}
                onOpenAssetSend={onOpenAssetSend}
                isLoadingAssets={isLoadingAssets}
                onCopyAssetParam={onCopyAssetParam}
                onAssetSettings={onAssetSettings}
                assetSettingsDialogWasOpened={assetSettingsDialogWasOpened}
                currentLocale={currentLocale}
                title={intl.formatMessage(messages.tokensListTitle)}
                onViewAllButtonClick={onViewAllButtonClick}
                tokenFavorites={tokenFavorites}
                onToggleFavorite={onToggleFavorite}
                disableControls
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
