export interface RequestObject {
    id: string;
    errorCode: BigInteger | null;
    value: string;
    validFrom: Date;
    url: string;
    isOdd?: boolean;
    hash: string;
    labels: JSX.Element[] | null;
    transactionHash: string;
}
