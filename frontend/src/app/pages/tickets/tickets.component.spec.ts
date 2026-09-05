import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AccountService, Order } from '../../core/account.service';
import { TicketsService } from '../../core/tickets.service';
import { ToastService } from '../../core/toast.service';
import { TicketsComponent } from './tickets.component';

/**
 * Golden WU tix49 — first tickets page specs.
 * Covers status pill classes, order key/label helpers, and orderQuery filter.
 */
describe('TicketsComponent filter / status helpers', () => {
  let ticketsApi: jasmine.SpyObj<TicketsService>;
  let account: jasmine.SpyObj<AccountService>;
  let toast: jasmine.SpyObj<ToastService>;

  function order(partial: Partial<Order> & Pick<Order, 'id'>): Order {
    return {
      status: 'paid',
      total_amount: 0,
      currency: 'RON',
      created_at: '2026-03-15T12:00:00Z',
      updated_at: '2026-03-15T12:00:00Z',
      items: [],
      ...partial,
    };
  }

  beforeEach(() => {
    ticketsApi = jasmine.createSpyObj<TicketsService>('TicketsService', [
      'listMine',
      'getOne',
      'create',
      'addMessage',
    ]);
    ticketsApi.listMine.and.returnValue(of([]));
    account = jasmine.createSpyObj<AccountService>('AccountService', ['getOrders']);
    account.getOrders.and.returnValue(of([]));
    toast = jasmine.createSpyObj<ToastService>('ToastService', [
      'info',
      'success',
      'error',
      'action',
    ]);

    TestBed.configureTestingModule({
      imports: [TicketsComponent, RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: TicketsService, useValue: ticketsApi },
        { provide: AccountService, useValue: account },
        { provide: ToastService, useValue: toast },
      ],
    });
  });

  it('statusPillClass maps resolved/triaged and falls back for other statuses', () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const cmp = fixture.componentInstance;

    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('new')).toContain('slate');
    expect(cmp.statusPillClass('unknown')).toContain('slate');
  });

  it('orderKey prefers reference_code and orderLabel appends mediumDate when present', () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const cmp = fixture.componentInstance;

    const withRef = order({ id: 'ord-1', reference_code: ' REF-42 ' });
    expect(cmp.orderKey(withRef)).toBe('REF-42');

    const idOnly = order({ id: 'ord-fallback', reference_code: null });
    expect(cmp.orderKey(idOnly)).toBe('ord-fallback');

    const blank = order({ id: '', reference_code: '   ' });
    expect(cmp.orderKey(blank)).toBe('');

    const stamp = new DatePipe('en-US').transform(
      new Date('2026-03-15T12:00:00Z'),
      'mediumDate',
    );
    expect(cmp.orderLabel(withRef)).toBe(`REF-42 · ${stamp}`);

    const noDate = order({
      id: 'ord-2',
      reference_code: 'NO-DATE',
      created_at: '' as unknown as string,
    });
    expect(cmp.orderLabel(noDate)).toBe('NO-DATE');
  });

  it('filteredOrders returns all orders when query empty and filters by orderLabel', () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const cmp = fixture.componentInstance;

    const a = order({ id: 'a', reference_code: 'ALPHA-1' });
    const b = order({ id: 'b', reference_code: 'BETA-9' });

    // orderQuery is a plain field; re-set orders() so the computed re-reads it
    cmp.orderQuery = '';
    cmp.orders.set([a, b]);
    expect(cmp.filteredOrders()).toEqual([a, b]);

    cmp.orderQuery = '  beta  ';
    cmp.orders.set([a, b]);
    expect(cmp.filteredOrders()).toEqual([b]);

    cmp.orderQuery = 'no-match';
    cmp.orders.set([a, b]);
    expect(cmp.filteredOrders()).toEqual([]);
  });
});
