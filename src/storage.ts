const STORAGE_KEY = "players";

export enum PaymentStatusEnum {
    None = 'None',
    PaidByCard = 'PaidByCard',
    PaidByCash = 'PaidByCash'
}

export interface Player {
    number: number;
    name: string;
    status: PaymentStatusEnum;
}

export function savePlayers(players: Player[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function loadPlayers(): Player[] | undefined {
    const value = localStorage.getItem(STORAGE_KEY);

    return value ? JSON.parse(value) : undefined;
}
