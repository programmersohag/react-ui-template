export class InstituteDto {
    private _instituteId: number | undefined
    private _instituteNameEn: string | undefined
    private _instituteNameBn: string | undefined


    constructor(instituteId: number | undefined, instituteNameEn: string | undefined, instituteNameBn: string | undefined) {
        this._instituteId = instituteId;
        this._instituteNameEn = instituteNameEn;
        this._instituteNameBn = instituteNameBn;
    }


    get instituteId(): number | undefined {
        return this._instituteId;
    }

    set instituteId(value: number | undefined) {
        this._instituteId = value;
    }

    get instituteNameEn(): string | undefined {
        return this._instituteNameEn;
    }

    set instituteNameEn(value: string | undefined) {
        this._instituteNameEn = value;
    }

    get instituteNameBn(): string | undefined {
        return this._instituteNameBn;
    }

    set instituteNameBn(value: string | undefined) {
        this._instituteNameBn = value;
    }
}