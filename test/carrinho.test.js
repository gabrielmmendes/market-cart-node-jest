import Carrinho from '../carrinho.js';
import Item from '../item.js';

describe('Testes do carrinho', () => {
    it('Deve inicializar vazio', () => {
        const carrinho = new Carrinho();

        expect(carrinho.itens).toHaveLength(0);
        expect(carrinho.subtotal).toBeNull();
        expect(carrinho.frete).toBeNull();
        expect(carrinho.total).toBeNull();
    });

    it('Deve ter itens', () => {
        const banana = new Item('Banana', 2, 5);
        const tomate = new Item('Tomate', 0.5, 1);

        const carrinho = new Carrinho();
        carrinho.adiciona(banana);
        carrinho.adiciona(tomate);

        expect(typeof carrinho).toBe('object');
        expect(carrinho.itens[0]).toBe(banana);
        expect(carrinho.itens[1]).toBe(tomate);

        expect(carrinho.itens).toContain(banana);
        expect(carrinho.itens).toContain(tomate);
    })

    it('Deve ter a propriedade "total" na inicialização', () => {
        const carrinho = new Carrinho();

        expect(carrinho).toHaveProperty('total');
    });

    it('Deve lançar erro ao finalizar compra com carrinho vazio', () => {
        expect(() => {
            const carrinho = new Carrinho();
            carrinho.finalizaCompra();
        }).toThrowError('Carrinho de compras vazio');

        // function englobaErroCarrinho() {
        //     const carrinho = new Carrinho();
        //     carrinho.finalizaCompra();
        // }
        // expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
    });

    it('Deve adicionar o frete', () => {
        const carrinho = new Carrinho();
        carrinho.adicionaFrete(10);
        expect(carrinho.frete).toBe(10);
    });

    it('Deve calcular o valor total dos itens', () => {
        const banana = new Item('Banana', 2, 5);
        const tomate = new Item('Tomate', 0.5, 1);

        const carrinho = new Carrinho();
        carrinho.adiciona(banana);
        carrinho.adiciona(tomate);

        expect(carrinho.calculaTotal()).toBe(10.5);
    });

    it('Deve finalizar as compras', () => {
        const banana = new Item('Banana', 2, 5);
        const tomate = new Item('Tomate', 0.5, 1);

        const carrinho = new Carrinho();
        carrinho.adiciona(banana);
        carrinho.adiciona(tomate);
        carrinho.adicionaFrete(10);

        expect(carrinho.finalizaCompra()).toStrictEqual({
            subtotal: 10.5,
            frete: 10,
            total: 20.5
        });
    });
})
