using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Database
{
  public class Repository<TEntity> : IRepository<TEntity>, IDisposable where TEntity : class, IEntity
  {
    private readonly DbContext _dbContext;

    public Repository(DbContext context)
    {
      _dbContext = context;
      DataTable = context.Set<TEntity>();
    }

    public long Count()
    {
      return DataTable.LongCount();
    }

    public Task<long> CountAsync()
    {
      return DataTable.LongCountAsync();
    }

    protected DbSet<TEntity> DataTable { get; }

    public virtual TEntity Add(TEntity entity)
    {
      Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<TEntity> entityEntry = DataTable.Add(entity);
      return entityEntry.Entity;
    }

    public virtual async Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken)
    {
      ValidateAddAsyncParameters(entity);

      var entityEntry = await DataTable.AddAsync(entity, cancellationToken).ConfigureAwait(false);
      return entityEntry.Entity;
    }

    public virtual void AddRange(IEnumerable<TEntity> entities)
    {
      ValidateAddRange(entities);
      DataTable.AddRange(entities);
    }

    public virtual async Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
    {
      if (!ValidateAddRange(entities))
      {
        return Enumerable.Empty<TEntity>();
      }

      await DataTable.AddRangeAsync(entities, cancellationToken).ConfigureAwait(false);
      IEnumerable<int> keys = entities.Select(entity => entity.GetKey());
      if (!keys.Any())
      {
        return Enumerable.Empty<TEntity>();
      }

      return await FindAsync(entity => keys.Contains(entity.GetKey()), cancellationToken).ConfigureAwait(false);
    }

    public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
    {
      return DataTable.Where(predicate);
    }


    public virtual async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
    {
      ValidateFindAsyncParameters(predicate);

      return await DataTable.Where(predicate).ToListAsync(cancellationToken).ConfigureAwait(false);
    }

    public virtual TEntity Get(int id)
    {
      if (id < 0)
        throw new ArgumentOutOfRangeException(nameof(id));

      TEntity entity = DataTable.Find(id);
      if (entity == null)
      {
        throw new EntityNotFoundException<TEntity>(id);
      }

      return entity;
    }

    public virtual Task<TEntity> GetAsync(int id, CancellationToken cancellationToken)
    {
      return DataTable.SingleAsync(item => item.GetKey() == id, cancellationToken);
    }

    public virtual IQueryable<TEntity> GetAll()
    {
      return _dbContext.Set<TEntity>();
    }

    public virtual void Remove(int id)
    {
      TEntity entity = Get(id);
      if (entity == null)
      {
        throw new EntityNotFoundException<TEntity>(id);
      }

      Remove(entity);
    }

    public virtual void Remove(TEntity entity)
    {
      if (entity == null)
      {
        throw new ArgumentNullException(nameof(entity));
      }

      DataTable.Remove(entity);
    }

    public virtual async Task RemoveAsync(int id, CancellationToken cancellationToken)
    {
      TEntity entity = await GetAsync(id, cancellationToken).ConfigureAwait(false);
      if (entity == null)
      {
        throw new EntityNotFoundException<TEntity>(id);
      }

      await RemoveAsync(entity, cancellationToken);
    }

    public virtual Task RemoveAsync(TEntity entity, CancellationToken cancellationToken)
    {
      if (entity == null)
      {
        throw new ArgumentNullException(nameof(entity));
      }

      return Task.Factory.StartNew(() => DataTable.Remove(entity), cancellationToken);
    }

    public virtual void RemoveRange(IEnumerable<TEntity> entities)
    {
      if (entities == null)
      {
        throw new ArgumentNullException(nameof(entities));
      }

      DataTable.RemoveRange(entities);
    }

    public virtual Task RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
    {
      if (entities == null)
      {
        throw new ArgumentNullException(nameof(entities));
      }

      return Task.Factory.StartNew(() => DataTable.RemoveRange(entities), cancellationToken);
    }

    public virtual void Update(TEntity entity)
    {
      int key = entity.GetKey();
      TEntity savedEntity = Get(key);
      if (savedEntity == null)
      {
        throw new EntityNotFoundException<TEntity>(key);
      }

      _dbContext.Entry(savedEntity).CurrentValues.SetValues(entity);
    }

    public virtual async Task UpdateAsync(TEntity entity, CancellationToken cancellationToken)
    {
      int key = entity.GetKey();
      TEntity savedEntity = await GetAsync(key, cancellationToken);
      if (savedEntity == null)
      {
        throw new EntityNotFoundException<TEntity>(key);
      }

      await Task.Factory.StartNew(() => _dbContext.Entry(savedEntity).CurrentValues.SetValues(entity), cancellationToken);
    }

    public virtual void BeforeSavingChanges() { }

    public void SaveChanges()
    {
      BeforeSavingChanges();
      _dbContext.SaveChanges();
      ChangesSaved();
    }

    public virtual void ChangesSaved() { }

    public void Dispose()
    {
      Dispose(true);
      GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
      if (disposing)
      {
        return;
      }

      _dbContext.Dispose();
    }

    ~Repository()
    {
      Dispose(false);
    }

    private bool ValidateAddRange(IEnumerable<TEntity> entities)
    {
      if (entities == null)
      {
        throw new ArgumentNullException(nameof(entities));
      }

      if (!entities.Any())
      {
        throw new ArgumentException("The collection to be added cannot be empty.");
      }

      return true;
    }

    private void ValidateAddAsyncParameters(TEntity entity)
    {
      if (entity == null)
        throw new ArgumentNullException(nameof(entity));
    }

    private static void ValidateFindAsyncParameters(Expression<Func<TEntity, bool>> predicate)
    {
      if (predicate == null)
        throw new ArgumentNullException(nameof(predicate));
    }
  }
}
