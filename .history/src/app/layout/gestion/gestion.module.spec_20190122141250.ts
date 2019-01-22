import { GestionModule } from './gestion.module';

describe('GestionModule', () => {
    let gestionModule: GestionModule;

    beforeEach(() => {
        gestionModule = new GestionModule();
    });

    it('should create an instance', () => {
        expect(gestionModule).toBeTruthy();
    });
});
