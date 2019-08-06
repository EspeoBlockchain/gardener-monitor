export interface RequestStatus {
    id: string;
    errorCode: BigInteger;
    value: string;
    validFrom: Date;
    url: string;
    isOdd: boolean;
    hash: string;
    labels: JSX.Element[];
    transactionHash: string;
}
