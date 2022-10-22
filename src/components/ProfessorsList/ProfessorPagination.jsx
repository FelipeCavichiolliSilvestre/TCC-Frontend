import { useProfessors } from '../../contexts/ProfessorsContext';
import Pagination from '../Pagination';

function ProfessorPagination(props) {
  const { pagination, isSearching } = useProfessors();

  return <Pagination {...pagination.register()} disable={isSearching} {...props} />;
}

export default ProfessorPagination;
