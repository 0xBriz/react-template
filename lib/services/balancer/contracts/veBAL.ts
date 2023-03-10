import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { networkProvider } from '@/lib/global/network';
import veBalAbi from '../../../abi/veBalAbi.json';
import { toJsTimestamp, toUtcTime } from '@/lib/util/time';
import { networkConfig } from '@/lib/config/network-config';
import { Multicaller } from '../../util/multicaller.service';

export type VeBalLockInfo = {
  lockedEndDate: number;
  lockedAmount: string;
  totalSupply: string;
  currentBalance: string;
  epoch: string;
  hasExistingLock: boolean;
  isExpired: boolean;
  percentOwned: string;
};

type VeBalLockInfoResult = {
  locked: BigNumber[];
  epoch: BigNumber;
  totalSupply: BigNumber;
  balanceOf: BigNumber;
};

export class VeBAL {
  public get address(): string {
    return networkConfig.balancer.votingEscrow.veAddress;
  }

  constructor() {}

  async getLockInfo(account?: string): Promise<VeBalLockInfo> {
    // if (!account) {
    //   return null;
    // }

    const veBalMulticaller = new Multicaller(networkProvider, veBalAbi);

    veBalMulticaller.call('locked', this.address, 'locked', [account]);
    veBalMulticaller.call('epoch', this.address, 'epoch');
    veBalMulticaller.call('totalSupply', this.address, 'totalSupply');
    veBalMulticaller.call('balanceOf', this.address, 'balanceOf', [account]);

    const result = await veBalMulticaller.execute<VeBalLockInfoResult>();

    return this.formatLockInfo(result);
  }

  formatLockInfo(lockInfo: VeBalLockInfoResult) {
    const [lockedAmount, lockedEndDate] = lockInfo.locked;

    const hasExistingLock = lockedAmount.gt(0);
    const lockedEndDateNormalised = toJsTimestamp(lockedEndDate.toNumber());
    const isExpired = hasExistingLock && Date.now() > lockedEndDateNormalised;

    const numerator = Number(formatUnits(lockInfo.balanceOf));
    const denominator = Number(formatUnits(lockInfo.totalSupply));

    return {
      lockedEndDate: lockedEndDateNormalised,
      lockedAmount: formatUnits(lockedAmount, 18),
      totalSupply: formatUnits(lockInfo.totalSupply, 18),
      epoch: lockInfo.epoch.toString(),
      hasExistingLock,
      isExpired,
      currentBalance: formatUnits(lockInfo.balanceOf, 18),
      percentOwned: ((numerator / denominator) * 100).toFixed(4),
    };
  }

  createLock(userProvider: Web3Provider, lockAmount: string, lockEndDate: string) {
    // return sendTransaction(userProvider, this.address, veBalAbi, 'create_lock', [
    //   parseUnits(lockAmount, 18),
    //   this.parseDate(lockEndDate)
    // ]);
  }

  increaseLock(userProvider: Web3Provider, lockAmount: string) {
    // return sendTransaction(userProvider, this.address, veBalAbi, 'increase_amount', [
    //   parseUnits(lockAmount, 18)
    // ]);
  }

  extendLock(userProvider: Web3Provider, lockEndDate: string) {
    // return sendTransaction(userProvider, this.address, veBalAbi, 'increase_unlock_time', [
    //   this.parseDate(lockEndDate)
    // ]);
  }

  unlock(userProvider: Web3Provider) {
    // return sendTransaction(userProvider, this.address, veBalAbi, 'withdraw', []);
  }

  private parseDate(date: string) {
    return (toUtcTime(new Date(date)) / 1000).toString();
  }
}
