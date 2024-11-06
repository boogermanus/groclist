using System.Collections.Generic;
using System.Threading.Tasks;

namespace GrocListApi.Core.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class, IEntity
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity?> Get(int id);
        Task<TEntity> Add(TEntity entity);
        Task<TEntity?> Update(TEntity entity);
        Task<TEntity?> Delete(int id);
    }
}