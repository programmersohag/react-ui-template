export class InstituteBranchDto {
    private _instituteBranchId: number | undefined
    private _instituteBranchNameEn: string | undefined
    private _instituteBranchNameBn: string | undefined

    constructor(instituteBranchId: number | undefined, instituteBranchNameEn: string | undefined, instituteBranchNameBn: string | undefined) {
        this._instituteBranchId = instituteBranchId;
        this._instituteBranchNameEn = instituteBranchNameEn;
        this._instituteBranchNameBn = instituteBranchNameBn;
    }


    get instituteBranchId(): number | undefined {
        return this._instituteBranchId;
    }

    set instituteBranchId(value: number | undefined) {
        this._instituteBranchId = value;
    }

    get instituteBranchNameEn(): string | undefined {
        return this._instituteBranchNameEn;
    }

    set instituteBranchNameEn(value: string | undefined) {
        this._instituteBranchNameEn = value;
    }

    get instituteBranchNameBn(): string | undefined {
        return this._instituteBranchNameBn;
    }

    set instituteBranchNameBn(value: string | undefined) {
        this._instituteBranchNameBn = value;
    }
}